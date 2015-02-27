var FullPage = React.createClass({
  render: function() {
    return (
      <div id="page">
        <MainTitle />
        <MainPage />
      </div>
    );
  }
});

var MainTitle = React.createClass({
  render: function() {
    return (
      <div className="main_title">
        <LeftTitleBox />
        <RightTitleBox />
      </div>
    );
  }
});

var LeftTitleBox = React.createClass({
  render: function() {
    return (
      <div className="left_title_box">
        <div className="vaule">Rat</div>
        <div className="label">Name</div>
      </div>
    );
  }
});


var RightTitleBox = React.createClass({
  render: function() {
    return (
      <div className="right_title_box">
        <div className="field">
          <div className="value">Rogue 4</div>
          <div className="label">Class and Level</div>
        </div>
        <div className="field">
          <div className="value">Background</div>
          <div className="label">Backgorund</div>
        </div>
        <div className="field">
          <div className="value">Nick</div>
          <div className="label">Player Name</div>
        </div>
        <div className="field">
          <div className="value">Harpers</div>
          <div className="label">Faction</div>
        </div>
        <div className="field">
          <div className="value">Hill Dwarf</div>
          <div className="label">Race</div>
        </div>
        <div className="field">
          <div className="value">Alignment</div>
          <div className="label">Alignment</div>
        </div>
        <div className="field">
          <div className="value">2700</div>
          <div className="label">Experince</div>
        </div>
        <div className="field">
          <div className="value">4u7985748957435</div>
          <div className="label">DCI Number</div>
        </div>
      </div>
    );
  }
});

var MainPage = React.createClass({
  render: function() {
    return (
      <div className="main_page"></div>
    );
  }
});

React.render(
  <FullPage />,
  document.getElementById('body')
);
