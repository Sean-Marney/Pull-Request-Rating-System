import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { Badges } from "../../components/pages/Rewards/Badges";

jest.mock("axios"); // mock axios module
jest.mock("react-cookie"); // mock useCookies hook

describe("Testing developer's badges page at /rewards", () => {
  it("should render the badges tables", async () => {
    render(<Badges levelList={[{_id: '64219eced7a8a98e89437ec4', level: 1, value: "20", name: 'Newbie'}]} level={1} current={0}/>);
    const title = await screen.findByText("Badges");
    expect(title).toBeInTheDocument();

  });
});