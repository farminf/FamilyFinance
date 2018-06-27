import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { CategoryForm } from "../../components/CategoryForm";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/CategoryForm";

describe("<CategoryForm />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(<CategoryForm classes={styles} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
