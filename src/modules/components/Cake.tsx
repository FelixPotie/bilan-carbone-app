import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { buyCake } from '../../redux/cake/actions';

const mapState = (state: RootState) => {
    return {
        numOfCakes: state.cake.numOfCakes
    }
}

const mapDispatch = (dispatch:any) => {
    return {
        buyCake: (n:number) => dispatch(buyCake(n))
    }
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

function CakeContainer(props: Props) {
    const [number, setNumber] = useState(1)
    return (
        <div>
            <h2>Number of cakes - {props.numOfCakes}</h2>
            <input type="number" value={number} onChange={e=> setNumber(parseInt(e.target.value))} />
            <button onClick={() => props.buyCake(number)}>Buy {number} cake</button>
        </div>
    )
}



export default connector(CakeContainer);
  