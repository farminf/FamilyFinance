import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { LoginFacebook } from "../../components/LoginFacebook";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/LoginFacebook";

describe("<LoginFacebook />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(<LoginFacebook classes={styles} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
