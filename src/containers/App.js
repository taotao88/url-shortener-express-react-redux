import { connect } from 'react-redux';
import InputGroup from '../components/InputGroup';
import shortenUrl from '../actions';


const mapStateToProps = urls => ({ 
  urls // Generating this.props.urls
})

export default connect(mapStateToProps, {
  shortenUrl,
})(InputGroup);
