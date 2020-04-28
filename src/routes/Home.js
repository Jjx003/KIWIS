import React from 'react';
import { Button, Menu, Input, Dropdown } from 'semantic-ui-react';
import '../css/App.css';

class Home extends React.Component {
	render() {
		return(
			<div>
        <Menu fluid size='large' color='olive' inverted widths={3} className="navbar">
          <Menu.Item name='KIWI'>KIWI</Menu.Item>

         <Menu.Item>
            <Input placeholder="What's your question?" />
          </Menu.Item>

          <Dropdown item text='Tags'>
            <Dropdown.Menu>
              <Dropdown.Item>C</Dropdown.Item>
              <Dropdown.Item>that's it.</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
				<h1> Home Page </h1>	
				<Button> Hi </Button>
			</div>
		);
	}
}

export default Home;
