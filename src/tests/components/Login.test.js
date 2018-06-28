import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { LoginUserNamePassword } from "../../components/Login";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/Login";

describe("<Login />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(<LoginUserNamePassword classes={styles} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
