import React from 'react'

function withStyles(Comp, styles) {
  return function(props) {
    if (props.staticContext) {
      props.staticContext.css.push(styles)
    }
    return <Comp {...props} />
  }
}

export default withStyles
