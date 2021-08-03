import * as React from 'react';
import { connect } from 'react-redux';

const Home = () => (
  <div>
    <h1>Alvaro Steven Cataño</h1>
    <p>Prueba FullStack</p>    
    <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
  </div>
);

export default connect()(Home);
