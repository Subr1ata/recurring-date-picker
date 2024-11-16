import Home from "@/app/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Home", () => {
  it("should have Docs text", () => {
    render(<Home />); //ARRANGE

    const myElem = screen.getByText("Docs"); //ACT

    expect(myElem).toBeInTheDocument(); //ASSERT
  });

  it('should contain the text "information"', () => {
    render(<Home />); //ARRANGE

    const myElem = screen.getByText(/information/i); //ACT

    expect(myElem).toBeInTheDocument(); //ASSERT
  });

  it("should have a heading", () => {
    render(<Home />); //ARRANGE

    const myElem = screen.getByRole("h2", {
      name: "Learn",
    }); //ACT

    expect(myElem).toBeInTheDocument(); //ASSERT
  });
});
