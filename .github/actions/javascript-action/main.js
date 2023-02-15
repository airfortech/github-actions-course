const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

const run = () => {
  // wyświetla wiadomość w logu
  core.notice("Hello, custom javascript action.");

  // pobranie inputów z "action.yml"
  const bucket = core.getInput("bucket", { required: true });
  // "required: true" bo podaliśmy default dla inputa "bucket-region"
  const bucketRegion = core.getInput("bucket-region", { required: true });
  const distFolder = core.getInput("dist-folder", { required: true });

  // upload plików
  const s3Uri = `s3://${bucket}`;
  // odpalenie komendy w shellu (aws cli jest preinstalowane w githubie)
  // parametry env będą automatycznie zaczytywane
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  // zwrócenie outputa
  const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
  core.setOutput("website-url", websiteUrl);
};

run();
