import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { Badges } from "../../components/pages/Rewards/Badges";

jest.mock("axios"); // mock axios module
jest.mock("react-cookie"); // mock useCookies hook

describe("Testing developer's badges page at /rewards", () => {
  it("should render the badges tables", async () => {
    let styles = {button: "makeStyles-button-28",deleteButton:"makeStyles-deleteButton-31",editButton:"makeStyles-editButton-30",paper: "makeStyles-paper-24",starCountBox: "makeStyles-starCountBox-29", tableContainer: "makeStyles-tableContainer-23", tableContent: "makeStyles-tableContent-26", tableHeaders: "makeStyles-tableHeaders-25",title: "makeStyles-title-27"};
    
    render(<Badges levelList={[{_id: '64219eced7a8a98e89437ec4', level: 1, value: "20", name: 'Newbie'}]} current={0} style = {styles}/>);
    const title = await screen.findByText("Badges");
    expect(title).toBeInTheDocument();
    const desc = await screen.findByText("Unlock new badges when you earn stars for your Pull Requests");
    expect(desc).toBeInTheDocument();
    const level = await screen.findByText("You have not earned any badges yet");
    expect(level).toBeInTheDocument();
  });
});