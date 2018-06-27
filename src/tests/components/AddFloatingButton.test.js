import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { AddFloatingButton } from "../../components/AddFloatingButton";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/AddFloatingButton";

describe("<AddFloatingButton />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(<AddFloatingButton classes={styles} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
