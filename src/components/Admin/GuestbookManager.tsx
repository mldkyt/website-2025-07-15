/*
 *     Lunya's Personal Website
 *     Copyright (C) 2024  Lunya UwU :3
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


import React from "react";

import { useEffect, useRef, useState } from "react";
import Main from "@/components/Generic/Main";
import Content from "@/components/Generic/Content";
import Heading from "@/components/Generic/Heading";
import Button from "@/components/Generic/Button";
import Metadata from "@/components/Generic/Metadata";
import { captureException } from "@sentry/nextjs";

interface GuestbookItem {
  id: number;
  username: string;
  body: string;
  ip: string;
  approved: boolean;
  replies: GuestbookReply[];
  replyTextField?: string;
}

interface GuestbookReply {
  id: number;
  username: string;
  body: string;
}

export default function GuestbookManager() {
  const [guestbookPosts, setGuestbookPosts] = useState<GuestbookItem[]>([]);
  const [error, setError] = useState<string>("test error");

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      setError("");
      fetch("/api/admin/guestbook/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("adminToken") || "",
        },
      })
        .then((x) => {
          x.json()
            .then((x) => {
              setGuestbookPosts(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                x.guestbook.map((x: any) => {
                  return {
                    ...x,
                    replyText: "",
                  };
                }),
              );
            })
            .catch((x) => {
              setError(`Error: ${x}`);
            });
        })
        .catch((x) => {
          setError(`Error: ${x}`);
        });
    }
  }, []);

  const approvePost = (id: number) => {
    fetch("/api/admin/guestbook/approve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("adminToken") || "",
      },
      body: JSON.stringify({
        guestbookId: id,
      }),
    }).then((x) => {
      if (x.ok) {
        setGuestbookPosts(
          guestbookPosts.map((y) => {
            if (y.id === id) {
              return { ...y, approved: true };
            }

            return y;
          }),
        );
      }
    });
  };
  const denyPost = (id: number) => {
    fetch("/api/admin/guestbook/deny", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("adminToken") || "",
      },
      body: JSON.stringify({
        guestbookId: id,
      }),
    }).then((x) => {
      if (x.ok) {
        setGuestbookPosts(guestbookPosts.filter((y) => y.id !== id));
      }
    });
  };

  const ban = (id: number) => {
    fetch("/api/admin/guestbook/ban", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("adminToken") || "",
      },
      body: JSON.stringify({
        guestbookId: id,
      }),
    }).then((x) => {
      if (x.ok) {
        setGuestbookPosts(guestbookPosts.filter((y) => y.id !== id));
      }
    });
  };
  const deletePost = (id: number) => {
    fetch("/api/admin/guestbook/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("adminToken") || "",
      },
      body: JSON.stringify({
        guestbookId: id,
      }),
    }).then((x) => {
      if (x.ok) {
        setGuestbookPosts(guestbookPosts.filter((y) => y.id !== id));
      }
    });
  };

  const setReply = (id: number, reply: string) => {
    setGuestbookPosts(
      guestbookPosts.map((x) => {
        if (x.id === id) {
          return { ...x, replyTextField: reply };
        }
        return x;
      }),
    );
  };

  const submitReply = (id: number) => {
    const reply = guestbookPosts.filter((y) => y.id === id);
    if (reply.length === 0) {
      setError("Reply failed: Not found");
      return;
    }

    const replyText = reply[0].replyTextField;

    fetch("/api/admin/guestbook/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("adminToken") || "",
      },
      body: JSON.stringify({
        replyTo: id,
        body: replyText,
      }),
    })
      .then((x) => {
        if (x.ok) {
          x.json()
            .then((x) => {
              setGuestbookPosts(
                guestbookPosts.map((y) => {
                  if (y.id === id) {
                    return {
                      ...y,
                      replies: [
                        ...y.replies,
                        {
                          username: "Lunya :3",
                          body: replyText || "UNDEFINED",
                          id: x.replyId,
                        },
                      ],
                      replyTextField: "",
                    };
                  }
                  return y;
                }),
              );
            })
            .catch((x) => {
              setError(`Error parsing JSON: ${x}`);
            });
        } else {
          setError(`Reply failed: ${x.statusText}`);
        }
      })
      .catch((x) => {
        setError(`${x}`);
      });
  };

  const updateReply = (
    post: GuestbookItem,
    reply: GuestbookReply,
    text: string,
  ) => {
    fetch("/api/admin/guestbook/updateReply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("adminToken") || "",
      },
      body: JSON.stringify({
        body: text,
        postId: reply.id.toString(),
      }),
    })
      .then((x) => {
        if (x.ok) {
          setGuestbookPosts(
            guestbookPosts.map((x1) => {
              if (x1.id === post.id) {
                return {
                  ...x1,
                  replies: x1.replies.map((y1) => {
                    if (y1.id === reply.id) {
                      return { ...y1, body: text };
                    }

                    return y1;
                  }),
                };
              }

              return x1;
            }),
          );
        } else {
          x.text()
            .then((y) => {
              setError(
                `Error updating reply: ${x.status} (${x.statusText}) ${y}`,
              );
              captureException(y);
            })
            .catch((y) => {
              setError(
                `Error updating reply: ${x.status} (${x.statusText}) ${y}`,
              );
              captureException(y);
            });
        }
      })
      .catch((x) => {
        setError(`Error updating reply: ${x}`);
        captureException(x);
      });
  };

  const deleteReply = (post: GuestbookItem, reply: GuestbookReply) => {
    fetch("/api/admin/guestbook/deleteReply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("adminToken") || "",
      },
      body: JSON.stringify({
        replyId: reply.id,
      }),
    })
      .then((x) => {
        if (x.ok) {
          setGuestbookPosts(
            guestbookPosts.map((x) => {
              if (x.id === post.id) {
                return {
                  ...x,
                  replies: x.replies.filter((y) => y.id !== reply.id),
                };
              }
              return x;
            }),
          );
        } else {
          x.text()
            .then((y) => {
              setError(
                `Error updating reply: ${x.status} (${x.statusText}) ${y}`,
              );
              captureException(y);
            })
            .catch((y) => {
              setError(
                `Error updating reply: ${x.status} (${x.statusText}) ${y}`,
              );
              captureException(y);
            });
        }
      })
      .catch((x) => {
        setError(`Error updating reply: ${x}`);
        captureException(x);
      });
  };

  return (
    <Main>
      <Metadata
        title={"Guestbook Management"}
        description={"Guestbook Management admin panel."}
      />
      <Content>
        {error.length > 0 && (
          <div
            className={
              "fixed top-4 m-auto bg-red-900 w-3/4 p-2 rounded-lg drop-shadow-md"
            }
          >
            {`Error: ${error}`}
          </div>
        )}
        <Heading level={1}>Guestbook Management</Heading>

        <Heading level={2}>Unapproved posts</Heading>
        {guestbookPosts
          .filter((x) => !x.approved)
          .map((x, i) => {
            return (
              <div key={i} className={"border-white border-2 my-2 rounded-lg p-2"}>
                <h1 className={"text-xl font-bold"}>{x.username}</h1>
                <p>{x.body}</p>
                <p className={"text-sm text-gray-500"}>{x.ip}</p>
                <div className={"flex-row flex gap-2"}>
                  <Button onClick={() => approvePost(x.id)}>Approve</Button>
                  <Button onClick={() => denyPost(x.id)}>Deny</Button>
                  <Button onClick={() => ban(x.id)}>Ban</Button>
                </div>
              </div>
            );
          })}

        <Heading level={2}>Approved posts</Heading>
        {guestbookPosts
          .filter((x) => x.approved)
          .map((x, i) => {
            return (
              <div key={i} className={"border-white border-2 my-2 rounded-lg p-2"}>
                <h1 className={"text-xl font-bold"}>{x.username}</h1>
                <p>{x.body}</p>
                <p className={"text-sm text-gray-500"}>{x.ip}</p>
                <div className={"flex-row flex gap-2"}>
                  <Button onClick={() => deletePost(x.id)}>Delete</Button>
                </div>
                {x.replies.map((y: GuestbookReply, i: number) => {
                  const updateTextMessage = () => {
                    const message = prompt("Update reply to?") ?? "null";
                    updateReply(x, y, message);
                  };
                  return (
                    <div
                      className={"ml-16"}
                      key={i}
                      onDoubleClick={updateTextMessage}
                    >
                      {`Re: ${y.body}`}
                      <div className="ml-2 inline">
                        <Button onClick={() => deleteReply(x, y)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  );
                })}
                <input
                  type={"text"}
                  className={"w-full bg-[#222] mt-2 px-2 p-1 rounded-lg"}
                  placeholder={"Reply..."}
                  value={x.replyTextField}
                  onChange={(y) => setReply(x.id, y.currentTarget.value)}
                  onKeyDown={(y) => {
                    if (y.key === "Enter") {
                      submitReply(x.id);
                    }
                  }}
                />
              </div>
            );
          })}
      </Content>
    </Main>
  );
}
