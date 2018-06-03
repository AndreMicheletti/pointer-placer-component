import React from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  TouchableWithoutFeedback
} from 'react-native';

class PointerPlacerView extends React.PureComponent {

  constructor(props) {
    super(props);

    const responder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gesture) => {
        if (event.target === 2) {
          this._startNewPointer(event, gesture);
          return true;
        } else {
          this.removePointer(event._targetInst.return.key)
        }
        return false;
      },
      onStartShouldSetPanResponderCapture: (event, gesture) => {
        if (event.target === 2) {
          this._startNewPointer(event, gesture);
          return true;
        } else {
          this.removePointer(event._targetInst.return.key)
        }
        return false;
      },
      onPanResponderMove: (event, gesture) => {
        const { newPointer } = this.state;
        const { dx, dy } = gesture;
        this.state.newPointer.position.setValue({
          x: (newPointer.startX + dx - (this.props.pointerSize / 2)),
          y: (newPointer.startY + dy - (this.props.pointerSize / 2))
        });
      },
      onPanResponderRelease: (event, gesture) => {
        const { newPointer } = this.state;
        const { dx, dy } = gesture;
        let pointers = [...this.state.pointers];
        pointers.push({
          x: (newPointer.startX + dx - (this.props.pointerSize / 2)),
          y: (newPointer.startY + dy - (this.props.pointerSize / 2))
        });
        this.setState({ newPointer: null, pointers });
      }
    });

    this._responder = responder;
    this.state = {
      pointers: [],
      newPointer: null
    };
  }

  getPointerImageStyle() {
    return {
      width: this.props.pointerSize,
      height: this.props.pointerSize,
      resizeMode: 'contain',
      position: 'absolute'
    }
  }

  renderPointer(point, index) {
    if (point) {
      return (
        <Image
          key={index}
          resizeMode="contain"
          source={this.props.pointerImage}
          style={[this.getPointerImageStyle(), {
            top: point.y,
            left: point.x
          }]}
        />
      );
    }
  }

  _startNewPointer(event, gesture) {
    const { locationX, locationY } = event.nativeEvent;
    this.setState({
      newPointer: {
        startX: locationX,
        startY: locationY,
        position: new Animated.ValueXY({
          x: locationX - (this.props.pointerSize / 2),
          y: locationY - (this.props.pointerSize / 2)
        })
      }
    });
  }

  removePointer(index) {
    let pointers = [...this.state.pointers];
    pointers.splice(parseInt(index), 1);
    this.setState({ pointers });
  }

  renderNewPointer() {
    const { newPointer } = this.state;
    if (newPointer) {
      return (
        <Animated.View style={newPointer.position.getLayout()}>
          <Image
            resizeMode="contain"
            source={this.props.pointerImage}
            style={this.getPointerImageStyle()}
          />
        </Animated.View>
      );
    }
  }

  renderPointers() {
    return this.state.pointers.map((point, index) => {
      return this.renderPointer(point, index);
    })
  }

  render() {
    return (
      <View {...this._responder.panHandlers} style={styles.containerView}>
        <TouchableWithoutFeedback style={styles.containerView}>
          <View style={styles.containerView}>
            {this.renderPointers()}
            {this.renderNewPointer()}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

PointerPlacerView.defaultProps = {
  pointerSize: 48
};

const styles = {
  containerView: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'relative'
  }
}

export default PointerPlacerView;
