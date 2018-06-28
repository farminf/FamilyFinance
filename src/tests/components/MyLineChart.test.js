import React from "react";
// import ReactShallowRenderer from "react-test-renderer/shallow";
import { MyLineChart } from "../../components/MyLineChart";
import toJSON from "enzyme-to-json";
import { createShallow } from "@material-ui/core/test-utils";
import { styles } from "../../components/MyLineChart";

describe("<MyLineChart />", () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it("should work", () => {
    const wrapper = shallow(
      <MyLineChart
        classes={styles}
        data={[]}
        dataKey="MyLineChart"
        nameKey="MyLineChart"
      />
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
