import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import "@testing-library/jest-dom";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { vi, describe, test, expect, beforeAll, afterEach, afterAll } from "vitest";
import TemperatureConverter from "../TemperatureConverter.svelte";

// Mock server setup with initial responses
const server = setupServer(
  http.get("https://catfact.ninja/fact", () => {
    return HttpResponse.json({
      fact: "The average cat sleeps 16-18 hours per day.",
      length: 42,
    });
  }),
  http.get("https://api.thecatapi.com/v1/images/search", () => {
    return HttpResponse.json([
      {
        id: "cat-id-123",
        url: "https://example.com/initial-cat.jpg",
        width: 600,
        height: 400,
      },
    ]);
  })
);

// Setup and teardown
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Cat Generator App", () => {
  test("renders initial loading states and then displays fetched cat data", async () => {
    render(TemperatureConverter);

    expect(await screen.findByText("Loading fact..."));
    expect(await screen.findByText("Loading image..."));

    await waitFor(() => {
      expect(screen.queryByText("Loading fact...")).not.toBeInTheDocument();
      expect(screen.queryByText("Loading image...")).not.toBeInTheDocument();
    });

    expect(
      await screen.findByText("The average cat sleeps 16-18 hours per day.")
    ).toBeInTheDocument();
    expect(screen.getByAltText("Random Cat")).toHaveAttribute(
      "src",
      "https://example.com/initial-cat.jpg"
    );
  });

  test("fetches and displays new cat fact when 'NEW CAT FACT' button is clicked", async () => {
    render(TemperatureConverter);

    await waitFor(() => {
      expect(screen.queryByText("Loading fact...")).not.toBeInTheDocument();
    });

    server.use(
      http.get("https://catfact.ninja/fact", () => {
        return HttpResponse.json({
          fact: "Cats can rotate their ears 180 degrees.",
          length: 37,
        });
      })
    );

    await fireEvent.click(screen.getByText("NEW CAT FACT"));
    expect(await screen.findByText("Loading fact...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading fact...")).not.toBeInTheDocument();
    });

    expect(
      await screen.findByText("Cats can rotate their ears 180 degrees.")
    ).toBeInTheDocument();
  });

  test("fetches and displays new cat image when 'NEW CAT IMAGE' button is clicked", async () => {
    const originalRandom = Math.random;
    Math.random = vi.fn(() => 0.3);

    render(TemperatureConverter);

    await waitFor(() => {
      expect(screen.queryByText("Loading image...")).not.toBeInTheDocument();
    });

    server.use(
      http.get("https://api.thecatapi.com/v1/images/search", () => {
        return HttpResponse.json([
          {
            id: "cat-id-456",
            url: "https://example.com/new-cat.jpg",
            width: 700,
            height: 500,
          },
        ]);
      })
    );

    await fireEvent.click(screen.getByText("NEW CAT IMAGE"));
    expect(await screen.findByText("Loading image..."));

    await waitFor(() => {
      expect(screen.queryByText("Loading image...")).not.toBeInTheDocument();
    });

    expect(screen.getByAltText("Random Cat")).toHaveAttribute(
      "src",
      "https://example.com/new-cat.jpg"
    );

    Math.random = originalRandom;
  });
});
