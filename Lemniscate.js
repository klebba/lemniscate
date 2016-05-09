// https://github.com/daedelus-j/bernoulli-drawer
// http://xahlee.info/SpecialPlaneCurves_dir/LemniscateOfBernoulli_dir/lemniscateOfBernoulli.html
// http://mathworld.wolfram.com/Lemniscate.html

class Lemniscate {
  constructor(target, size) {
    this.target = target;
    this.size = size;
    this.init();
  }
  init() {
    const node = this.target;
    const size = this.size;
    const scale = 0.8;
    const domain = size * (scale * 0.5);
    const center = size / 2;
    const numPoints = 44;

    const svg = d3.select(node)
      .append('svg')
      .attr('width', size)
      .attr('height', size)
      .append('g')
      .attr('transform', `translate(${center}, ${center})`);

    svg.append('line')
       .attr('class', 'yaxis')
       .attr('y1', -domain)
       .attr('y2', domain);

    svg.append('line')
       .attr('class', 'xaxis')
       .attr('x1', -domain)
       .attr('x2', domain);

    const points = Lemniscate.getPoints(numPoints, domain);
    // close end
    points.push({x: points[0].x, y: points[0].y});

    const line = d3.svg.line()
      .interpolate('cardinal')
      .x(d => d.x)
      .y(d => d.y);

    const path = svg.append('path').attr('d', line(points));
    // const totalLength = path.node().getTotalLength();
    // console.log(totalLength);

    svg.selectAll('circle')
        .data(points)
      .enter().append('circle')
        .attr('index', (d, i) => {
          return i;
        })
        .attr('r', 4)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
  }
  static getPoints(count, size) {
    const range = Array.apply(null, {length: count}).map(Number.call, Number);
    const points = range.map((theta) => {
      return {
        x: Lemniscate.bernoulliX(theta, size),
        y: Lemniscate.bernoulliY(theta, size),
      };
    });
    points.sort(Lemniscate.sortPoints);
    return points;
  }
  static sortPoints(a, b) {
    let aa = 0;
    let bb = 0;

    // quadrant sort
    if (a.x > 0) {
      aa += 100;
    }

    if (b.x > 0) {
      bb += 100;
    }

    if (a.y > 0) {
      aa += 10;
    }

    if (b.y > 0) {
      bb += 10;
    }

    // position sort
    if (a.x > 0 && a.y > 0) {
      // sort Q1 on X desc
      if (a.x > b.x) {
        bb += 1;
      } else {
        aa += 1;
      }
    } else if (a.x > 0 && a.y <= 0) {
      // sort Q2 on X asc
      if (a.x > b.x) {
        aa += 1;
      } else {
        bb += 1;
      }
    } else if (a.x <= 0 && a.y > 0) {
      // sort Q3 on X desc
      if (Math.abs(a.x) > Math.abs(b.x)) {
        bb += 1;
      } else {
        aa += 1;
      }
    } else if (a.x <= 0 && a.y <= 0) {
      // sort Q4 on X asc
      if (Math.abs(a.x) > Math.abs(b.x)) {
        aa += 1;
      } else {
        bb += 1;
      }
    }

    return aa - bb;
  }
  static bernoulliScale(theta, size) {
    return size / (Math.pow(Math.sin(theta), 2) + 1);
  }
  static bernoulliX(theta, size) {
    const scale = Lemniscate.bernoulliScale(theta, size);
    return scale * Math.cos(theta);
  }
  static bernoulliY(theta, size) {
    const scale = Lemniscate.bernoulliScale(theta, size);
    return scale * Math.sin(2 * theta) / 2;
  }
}
