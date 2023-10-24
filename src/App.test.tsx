import { render, screen,act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";
import { API } from "./API";

test("回答保存ボタンを押して、回答を保存するためのパラメータが渡されること", () => {
  // setup
  const submit = jest
    .spyOn(API, "submit")
    .mockImplementation((args) => Promise.resolve());

  // when
  render(<App />);
  const button = screen.getByText(/回答を保存/i);
  act(() => {
    userEvent.click(button);
  })
  

  // then
  const expected = [
    {
      "id": "6a06a83d-7ff9-47bd-91d4-1173097f4e35",
      "answers": null
    },
    {
      "id": "3a2091c3-a649-48bf-99d3-09ed9ef8087f",
      "answers": null
    },
    {
      "id": "387c4a7a-faf9-4626-b20c-0869fc10d754",
      "answers": null
    },
    {
      "id": "14cd0682-47a0-4da6-84bb-ef1c4e9e6641",
      "answers": null
    },
    {
      "id": "060fbcc5-c8ee-4447-8cad-d598f05b1342",
      "answers": null
    },
    {
      "id": "060fbcc5-c8ee-4447-8cad-d598f05b1349",
      "answers": null
    }
  ];


  expect(submit).toBeCalledWith(expected);
});
