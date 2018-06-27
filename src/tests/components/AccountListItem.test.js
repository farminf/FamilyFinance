import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { AccountListItems } from "../../components/AccountListItem";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";

describe("<AccountListItems />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(<AccountListItems name="test" balance="100" />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
