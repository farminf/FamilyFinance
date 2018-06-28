import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { FilterListBar } from "../../components/FilterListBar";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/FilterListBar";

describe("<FilterListBar />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(<FilterListBar classes={styles} filters={{}} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
