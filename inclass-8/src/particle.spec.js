import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {

    var height = 800
    var width = 800
    var canvas = {width, height}

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // check position, velocity, acceleration, mass
        expect(p.position).to.be.ok
        expect(p.velocity).to.be.ok
        expect(p.acceleration).to.be.ok
        expect(p.mass).to.be.ok
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0, canvas)
        expect(position[0]).to.be.closeTo(1.5, 0.001)
        expect(position[1]).to.be.closeTo(0.5, 0.001)
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0, canvas) // dt is different here
        expect(position[0]).to.be.closeTo(2.0, 0.001)
        expect(position[1]).to.be.closeTo(0.5, 0.001)
    })

    it('should update the velocity by the acceleration', () => {
        // similar to the previous check
        const p = particle({ velocity: [1, 1], acceleration: [0.5, -0.5] })
        const { velocity } = update(p, 1.0, canvas)
        expect(velocity[0]).to.closeTo(1.5, 0.001)
        expect(velocity[1]).to.closeTo(0.5, 0.001)   
    })

    it('particles should wrap around the world', () => {
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides
        const p = particle({ position: [-300, 900], velocity: [1.0, -1.0] })
        const { position } = update(p, 1.0, canvas)
        expect(position[0] <= width).to.be.true
        expect(position[0] >= 0).to.be.true
        expect(position[1] <= height).to.be.true
        expect(position[1] >= 0).to.be.true
    })

})
