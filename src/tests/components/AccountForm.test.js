import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { AccountForm } from "../../components/AccountForm";
import { styles } from "../../components/AccountForm";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";

describe("<AccountForm />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(<AccountForm classes={styles} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
