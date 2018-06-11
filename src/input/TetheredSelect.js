import React from 'react'
import Select from 'react-select'
import TetherComponent from 'react-tether'

// from https://github.com/JedWatson/react-select/issues/810#issuecomment-250274937
export default class TetheredSelect extends Select {
  constructor(props) {
    super(props)

    this.renderOuter = this.renderOuterOverride
  }

  renderOuterOverride(...args) {
    const menu = super.renderOuter.apply(this, args)

    // Don't return an updated menu render if we don't have one
    if (!menu) {
      return null
    }

    // this.wrapper comes from the ref of the main Select component (super.render())
    const selectWidth = this.wrapper ? this.wrapper.offsetWidth : null

    return (
      <TetherComponent
        renderElementTo="body"
        ref="tethered-component"
        attachment="top left"
        targetAttachment="top left"
        constraints={[{
          to: 'window',
          attachment: 'together',
          pin: ['top'],
        }]}
      >
        {
          /* Apply position:static to our menu so that it's parent will
          get the correct dimensions and we can tether the parent */
        }
        <div />
        {React.cloneElement(menu, { style: { position: 'static', width: selectWidth } })}
      </TetherComponent>
    )
  }
}
