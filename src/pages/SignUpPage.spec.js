import SignUpPage from "./SignUpPage";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import axios from "axios";

describe("Sign Up Page", () => {
  describe("Layout", () => {
    it("has header", () => {
      render(<SignUpPage />);
      const header = screen.queryByRole("heading", { name: "Sign Up" });
      expect(header).toBeInTheDocument();
    });
    it("has username input", () => {
      render(<SignUpPage />);
      const input = screen.getByPlaceholderText("username");
      expect(input).toBeInTheDocument();
    });
    it("has email input", () => {
      render(<SignUpPage />);
      const input = screen.getByPlaceholderText("email");
      expect(input).toBeInTheDocument();
    });
    it("has password input", () => {
      render(<SignUpPage />);
      const input = screen.getByPlaceholderText("password");
      expect(input).toBeInTheDocument();
    });
    it("has password type for password input", () => {
      render(<SignUpPage />);
      const input = screen.getByPlaceholderText("password");
      expect(input.type).toBe("password");
    });
    it("has password repeat input", () => {
      render(<SignUpPage />);
      const input = screen.getByPlaceholderText("password repeat");
      expect(input).toBeInTheDocument();
    });
    it("has password type for password repeat input", () => {
      render(<SignUpPage />);
      const input = screen.getByPlaceholderText("password repeat");
      expect(input.type).toBe("password");
    });
    it("has Sign Up button", () => {
      render(<SignUpPage />);
      const button = screen.queryByRole("button", { name: "Sign Up" });
      expect(button).toBeInTheDocument();
    });
    it("disables the button initially", () => {
      render(<SignUpPage />);
      const button = screen.queryByRole("button", { name: "Sign Up" });
      expect(button).toBeDisabled();
    });
    describe("Interactions", () => {
      it("enables the button when password and password repeat fields have same value", () => {
        render(<SignUpPage />);
        const passwordInput = screen.getByPlaceholderText("password");
        const passwordRepeatInput =
          screen.getByPlaceholderText("password repeat");
        userEvent.type(passwordInput, "123456");
        userEvent.type(passwordRepeatInput, "123456");
        const button = screen.queryByRole("button", { name: "Sign Up" });
        expect(button).toBeEnabled();
      });
      it("sends usernane, email and password to backend after clicking the button", async () => {
        let requestBody;
        const server = setupServer(
          rest.post("/api/users", (req, res, ctx) => {
            requestBody = req.body;
            return res(ctx.status(200));
          })
        );
        server.listen();
        render(<SignUpPage />);
        const usernameInput = screen.getByPlaceholderText("username");
        const emailInput = screen.getByPlaceholderText("email");
        const passwordInput = screen.getByPlaceholderText("password");
        const passwordRepeatInput =
          screen.getByPlaceholderText("password repeat");
        userEvent.type(usernameInput, "marv");
        userEvent.type(emailInput, "marv@gmail.com");
        userEvent.type(passwordInput, "123456");
        userEvent.type(passwordRepeatInput, "123456");
        const button = screen.queryByRole("button", { name: "Sign Up" });
        // userEvent.click(button)// this relies on the backend to be running ,meaning, if we forget to start the backend the test will fail
        //instead of relying on the backend we will mock the behaviour, before clicking the button we'll have a mock implementation
        // const mockFn = jest.fn();
        //axios.post = mockFn;
        //window.fetch = mockFn;
        userEvent.click(button);
        await new Promise((resolve) => setTimeout(resolve, 500));
        //const firstCallOfMockFunction = mockFn.mock.calls[0];
        //  const body = firstCallOfMockFunction[1]; // using axios
        //const body = JSON.parse(firstCallOfMockFunction[1].body);
        expect(requestBody).toEqual({
          username: "marv",
          email: "marv@gmail.com",
          password: "123456",
        });
      });
    });
  });
});
