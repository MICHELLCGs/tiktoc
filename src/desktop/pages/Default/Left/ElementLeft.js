import { useState } from "react";
import "./ElementLeft.scss";

function ElementLeft() {
  const [verify, setVerify] = useState(false);
  return (
    <>
      <div>
        <div className="element-left">
          <div className="father-wrap-left">
            <div className="wrap-left">
              <div className="func-1">
                <div>
                  {/* replace wrap link this tag here */}
                  <div className="link-of-func-1">
                    <img title="Para ti" alt="Para ti" src="/logos/home.png" />
                    <h2>Para ti</h2>
                  </div>
                </div>
                <div>
                  <div className="link-of-func-1">
                    <img
                      title="Siguiendo"
                      alt="Siguiendo"
                      src="/logos/following.png"
                    />
                    <h2>Siguiendo</h2>
                  </div>
                </div>
                <div>
                  <div className="link-of-func-1">
                    <img
                      title="Livestream"
                      alt="Livestream"
                      src="/logos/livestream.png"
                    />
                    <h2>Live</h2>
                  </div>
                </div>
                <div>
                  <div className="link-of-func-1">
                    <img
                      title="Livestream"
                      alt="Livestream"
                      src="/logos/person.png"
                    />
                    <h2>Perfil</h2>
                  </div>
                </div>
              </div>
              {verify ? (
                <>
                  <div className="func-user">
                    <p>Tài khoản được đề xuất</p>
                    {/* map array data user here - 5 account */}
                    <div className="div-user-menu-left">
                      {/* replace link here(img) */}
                      <div className="link-user-img-menu-left">
                        <div className="div-user-img-menu-left">
                          <span className="span-user-img-menu-left">
                            <img
                              title="name-user"
                              alt="name-user"
                              src="/img-user-upload/avatar01.jpeg"
                            />
                          </span>
                        </div>
                      </div>
                      {/* replace link here(img) */}
                      <div className="link-user-name-menu-left">
                        <div className="id-user-menu-left">
                          <h4>hthu_16</h4>
                          <div className="div-mark-user">
                            <img alt="mark" src="/logos/mark-blue.png" />
                          </div>
                        </div>
                        <p>Hoài Thu Nguyễn</p>
                      </div>
                    </div>
                    <button className="show-more-user">
                      <p className="button-func">Xem tất cả</p>
                    </button>
                  </div>
                  <div className="func-user">
                    <p>Các tài khoản đang follow</p>
                    {/* map array data user here - 10 account */}
                    <div className="div-user-menu-left">
                      {/* replace link here(img) */}
                      <div className="link-user-img-menu-left">
                        <div className="div-user-img-menu-left">
                          <span className="span-user-img-menu-left">
                            <img
                              title="name-user"
                              alt="name-user"
                              src="/img-user-upload/avatar01.jpeg"
                            />
                          </span>
                        </div>
                      </div>
                      {/* replace link here(img) */}
                      <div className="link-user-name-menu-left">
                        <div className="id-user-menu-left">
                          <h4>hthu_16</h4>
                          <div className="div-mark-user">
                            <img alt="mark" src="/logos/mark-blue.png" />
                          </div>
                        </div>
                        <p>Hoài Thu Nguyễn</p>
                      </div>
                    </div>
                    <button className="show-more-user">
                      <p className="button-func">Xem thêm</p>
                    </button>
                  </div>
                  <div className="func-hashtag">
                    <p>Khám phá</p>
                    {/* map data hastag here */}
                    <div className="list-hashtag">
                      {/* replace tag link here */}
                      <div className="hashtag">
                        <div className="div-hashtag">
                          <img
                            alt="hashtag"
                            title="hashtag"
                            src="/logos/hashtag.png"
                          />
                          <p>nothing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="func-footer">
                    <div className="func-banner">
                      <h4>Tạo hiệu ứng</h4>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ElementLeft;
