import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { buyIceCream } from '../../redux/iceCream/actions';

const mapState = (state: RootState) => {
    return {
        numOfIceCream: state.iceCream.numOfIceCream
    }
}

const mapDispatch = (dispatch:any) => {
    return {
        buyIceCream: () => dispatch(buyIceCream())
    }
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

function IceCreamContainer(props: Props) {
    return (
        <div>
            <h2>Number of cakes - {props.numOfIceCream}</h2>
            <button onClick={props.buyIceCream}>Buy cake</button>
        </div>
    )
}



export default connector(IceCreamContainer);
  