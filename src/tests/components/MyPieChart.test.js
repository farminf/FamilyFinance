import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { MyPieChart } from "../../components/MyPieChart";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/MyPieChart";

describe("<MyPieChart />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(
      <MyPieChart
        classes={styles}
        data={[]}
        dataKey="MyPieChart"
        nameKey="MyPieChart"
      />
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
