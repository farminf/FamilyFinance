import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { Statistic } from "../../components/Statistic";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/Statistic";

describe("<Statistic />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(<Statistic classes={styles} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
