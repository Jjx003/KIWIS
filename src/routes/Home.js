import React from 'react';
import { Button, Menu, Input, Dropdown, Image, Checkbox, List } from 'semantic-ui-react';
import '../css/App.css';
import logo from '../images/logo_white.png';

const options = [
  { key: 'c', text: 'C', value: 'c' },
  { key: 'c++', text: 'C++', value: 'c++' },
  { key: 'c++++', text: 'C++++', value: 'c++++' },
  { key: 'c--', text: 'C--', value: 'c--' },
]

class Home extends React.Component {
	render() {
		return(
			<div>
        <Menu fluid size='large' color='olive' inverted widths={3} className="navbar">
          <Menu.Item name='KIWI'>
              <Image fluid size='tiny' src={logo}/>
          </Menu.Item>

         <Menu.Item>
            <Input placeholder="What's your question?" />
          </Menu.Item>

          <Dropdown fluid multiple selection item options={options} text='Tags' />
        </Menu>
        <List divided relaxed className="questions">
        <List.Item>
        <List.Content>
          <List.Header>Ok, I did my hello world, how do I goodbye world?</List.Header>
          <List.Description>tags:C</List.Description>
        </List.Content>
        </List.Item>
        <List.Item>
        <List.Content>
          <List.Header>Trying to do Hello World and C is complaining that hello world isn't a command?</List.Header>
          <List.Description>tags:C</List.Description>
        </List.Content>
        </List.Item>
        </List>
			</div>
		);
	}
}

export default Home;
