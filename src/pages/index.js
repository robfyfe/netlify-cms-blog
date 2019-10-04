import React from "react";
import { Link, graphql } from "gatsby";
import "../styles/main.css";
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";

const styles = theme => ({
  postCard: {
    marginBottom: theme.spacing(5),
  },
  postDescription: {
    color: "black",
  },
});

class BlogIndex extends React.Component {
  render() {
    const { data, classes } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Sweet Dreams Jelly Bean" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <Card className={classes.postCard} key={node.fields.slug}>
              <CardActionArea>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  <CardHeader title={title} subheader={node.frontmatter.date} />
                  <CardContent>
                    <Typography
                      className={classes.postDescription}
                      variant="h6"
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          );
        })}
      </Layout>
    );
  }
}

export default withStyles(styles)(BlogIndex);

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
