import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { AccountList } from "../../components/AccountList";
import { styles } from "../../components/AccountList";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";

describe("<AccountList />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(<AccountList classes={styles} accounts={[]} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
