import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { SignUp } from "../../components/SignUp";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/SignUp";

describe("<SignUp />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(<SignUp classes={styles} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
