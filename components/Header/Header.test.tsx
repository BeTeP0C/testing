import { render, screen } from "@testing-library/react"
import { Header } from "./Header";

describe ("Test Header", () => {
  test("Render Header", () => {
    render(<Header />)

    expect(screen.getByRole("heading", {name: "Название магазина"})).toBeInTheDocument()
    expect(screen.getByTestId("status").textContent.includes("Активен")).toBe(true)
  })

})
