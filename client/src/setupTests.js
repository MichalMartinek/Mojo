import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import './iconLibrary'

configure({ adapter: new Adapter() });