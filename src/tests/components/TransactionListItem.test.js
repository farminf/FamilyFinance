import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { TransactionListItem } from "../../components/TransactionListItem";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/TransactionListItem";

describe("<TransactionListItem />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(<TransactionListItem classes={styles} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
