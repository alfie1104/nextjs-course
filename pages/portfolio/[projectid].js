import { useRouter, withRouter } from "next/router";

function PortfolioProjectPage() {
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query);
  const projectId = router.query.projectid;

  // send a request to some backend server
  // to fetch the piece of data with an id of router.query.projectid

  return (
    <div>
      <h1>The Portfolio {projectId} Page</h1>
    </div>
  );
}

export default PortfolioProjectPage;
