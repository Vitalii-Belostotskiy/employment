/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState } from 'react';
import { NewsType } from '../types/NewsType';
import './NavList.scss';
import { getData } from '../utils/HttpClient';

export const NewsListPage: React.FC = () => {
  const [news, setNews] = useState<NewsType[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const randomSource = useMemo(() => {
    const sourceId = ['cnn', 'fox-news', 'bbc-news'];

    return sourceId[Math.floor(Math.random() * sourceId.length)];
  }, []);

  const toggleVisibility = () => {
    if (window.scrollY > 1500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    let isMounted = true;

    getData(`/everything/${randomSource}`)
      .then(data => {
        if (isMounted) {
          if (Array.isArray(data.articles)) {
            setNews(data.articles); // Adjust according to the real structure
          } else {
            setNews([]); // or handle the case when the data is not valid
          }
        }
      })
      .catch(() => {
        setNews([]); // Set to empty array on error
      });

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      isMounted = false;
    };
  }, [randomSource]);

  return (
    <>
      <article className="media">
        {news.length > 0 ? (
          news.map((nw, index) => (
            <React.Fragment key={index}>
              <figure className="media-left">
                <p>
                  <strong>{nw.source.name}</strong>{' '}
                  <small>{`@${nw.author}`}</small>{' '}
                  <small>{nw.publishedAt}</small>
                  <br />
                  <small>{nw.title}</small>
                </p>
                <br />
                <p className="image">
                  <img src={nw.urlToImage} alt="NewsLogo" />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>{nw.description}</p>
                </div>
                <nav className="level is-mobile">
                  <div className="level-left">
                    <a href={nw.url} className="level-item" target="blanc">
                      Read more
                      <span className="icon is-small pl-4">
                        <i className="fas fa-reply"></i>
                      </span>
                    </a>
                  </div>
                </nav>
              </div>
            </React.Fragment>
          ))
        ) : (
          <p>No news available.</p>
        )}
      </article>
      {isVisible && (
        <button className="button is-medium" onClick={scrollToTop}>
          <span className="icon is-small">
            <i className="fas fa-arrow-up"></i>
          </span>
        </button>
      )}
    </>
  );
};
