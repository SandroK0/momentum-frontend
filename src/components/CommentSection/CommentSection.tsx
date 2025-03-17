import { useEffect, useState } from "react";
import styles from "./CommentSection.module.css";
import { getAllComments, postComment } from "../../api/api";
import { Comment } from "../../Types";
import leftIcon from "../../assets/Left 2.svg";

export default function CommentSection(props: { taskId: number }) {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [show, setShow] = useState<number | null>(null);
  const [text, setText] = useState<string>("");
  const [text2, setText2] = useState<string>("");

  async function getComments() {
    try {
      const data = await getAllComments(props.taskId);

      setComments(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  }

  async function submitComment(text: string, parent_id?: number) {
    if (!text || text.trim() === "") {
      return;
    }

    try {
      await postComment(props.taskId, text, parent_id);

      setText("");
      setText2("");
      getComments();
    } catch (error) {
      console.log("Error submititng comment", error);
    }
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className={styles.commentsCont}>
      <div className={styles.commentInput}>
        <textarea
          name="comment"
          id="comment"
          value={text}
          placeholder="დაწერე კომენტარი"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button onClick={() => submitComment(text)}>დააკომენტარე</button>
      </div>
      <div className={styles.commentCount}>
        კომენტარები <span>{comments?.length}</span>
      </div>
      <div>
        {comments &&
          comments.map((comment: Comment) => (
            <div className={styles.commentList}>
              <div className={styles.comment} key={comment.id}>
                <img src={comment.author_avatar} className={styles.avatar} />
                <div className={styles.commentDetails}>
                  <div className={styles.author}>{comment.author_nickname}</div>
                  <p>{comment.text}</p>
                  <button onClick={() => setShow(show ? null : comment.id)}>
                    <img src={leftIcon} />
                    უპასუხე
                  </button>
                  <div className={styles.subField}>
                    {show === comment.id && (
                      <div className={styles.commentInput}>
                        <textarea
                          name="comment"
                          id="comment"
                          value={text2}
                          placeholder="დაწერე კომენტარი"
                          onChange={(e) => setText2(e.target.value)}
                        ></textarea>
                        <button
                          onClick={() => submitComment(text2, comment.id)}
                        >
                          დააკომენტარე
                        </button>
                      </div>
                    )}
                    <div className={styles.subComments}>
                      {comment.sub_comments.map((comment: Comment) => (
                        <div className={styles.comment} key={comment.id}>
                          <img
                            src={comment.author_avatar}
                            className={styles.avatar}
                          />
                          <div className={styles.commentDetails}>
                            <div className={styles.author}>
                              {comment.author_nickname}
                            </div>
                            <p>{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
