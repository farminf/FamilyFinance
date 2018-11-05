import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { LoginGithub } from "../../components/LoginGithub";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/LoginGithub";

describe("<LoginFacebook />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(<LoginGithub classes={styles} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
