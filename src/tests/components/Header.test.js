import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { Header } from "../../components/Header";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/Header";

describe("<Header />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(<Header theme={{}} classes={styles} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
