import React from "react";
import Game from "./components/Game";

import { connect } from "react-redux";
import { AppState } from "./store";
import { testRedux } from "./store/actions";

interface TestProps {
  testRedux: typeof testRedux;
}

const App: React.FC<TestProps> = ({ testRedux }) => {
  React.useEffect(() => {
    testRedux("Testing");
  }, []);

  return <Game />;
};

const mapStateToProps = (state: AppState) => {
  return {
    testRedux: testRedux,
  };
};

export default connect(mapStateToProps, { testRedux })(App);
