import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { MyBarChart } from "../../components/MyBarChart";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/MyBarChart";

describe("<MyBarChart />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(
      <MyBarChart
        classes={styles}
        data={[]}
        yAxis1="MyBarChart"
        yAxis2="MyBarChart"
      />
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
