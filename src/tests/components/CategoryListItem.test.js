import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { CategoryListItem } from "../../components/CategoryListItem";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";

describe("<CategoryListItem />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(<CategoryListItem id="salary" name="salary" />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
