import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { LoginGoogle } from "../../components/LoginGoogle";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/LoginGoogle";

describe("<LoginFacebook />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(<LoginGoogle classes={styles} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
