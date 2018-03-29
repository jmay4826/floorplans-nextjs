import TextField from "material-ui/TextField";
import Card, { CardText, CardTitle } from "material-ui/Card";

import withMui from "../lib/withMui";
import withData from "../lib/withData";
import Layout from "../components/Layout";
import FlatButton from "material-ui/FlatButton";

import LocationList from "../components/LocationList";

class Locations extends React.Component {
  render() {
    const { locations = [] } = this.props;
    return (
      <Layout title="Choose a location">
        <div>
          <Card>
            <CardText>
              <TextField hintText="Search" />
              <LocationList />
            </CardText>
          </Card>
          <style jsx>
            {`
              div {
                margin: 10px auto;
                max-width: 60%;
              }
            `}
          </style>
        </div>
      </Layout>
    );
  }
}

export default withData(withMui(Locations));
