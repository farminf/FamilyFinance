import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { CategoryStatisticTable } from "../../components/CategoryStatisticTable";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/CategoryStatisticTable";

describe("<CategoryStatisticTable />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(<CategoryStatisticTable classes={styles} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
