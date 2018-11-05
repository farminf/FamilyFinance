import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import UserErrors from "../../components/UserErrors";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";

describe("<UserErrors />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(
      <UserErrors errors={[{ code: "error", message: "generic error" }]} />
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
