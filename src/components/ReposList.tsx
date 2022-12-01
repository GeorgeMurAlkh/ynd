import { IRepo } from '../models/repo.model';

interface ReposListProps {
  repos: IRepo[] | undefined
}

const ReposList = ({ repos }: ReposListProps) => {
  return (
    <>
      <div className="card m-2">
        <div className="list-group bg-primary">
        {repos && repos.map((repo, i) => {
            return (
              <a className={`list-group-item list-group-item-action text-break ${i < repos.length - 1 && 'border-bottom border-secondary'}`}
              href={repo.html_url} target="_blank" 
              rel="noreferrer"
              key={repo.id}
              data-testid={`item-${i}`}
              >
                <div className="d-flex align-items-center justify-content-between text-start">
                  <div className="align-items-start pe-2">
                    <h5>
                    {repo.name}
                    </h5>
                    <p>
                      {repo.description}
                    </p>          
                  </div>
                  <div className="d-flex">
                    <i className="bi bi-star-fill me-1" />
                    <span className="unbrake">{repo.stargazers_count}</span>
                  </div>
                </div>
              </a>
            );
          }
        )}
        </div>
      </div>
    </>
  );
};

export default ReposList;
