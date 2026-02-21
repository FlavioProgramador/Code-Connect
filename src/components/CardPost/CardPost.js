import Image from 'next/image'
import React from 'react'
import Avatar from '../Avatar/Avatar'

const CardPost = ({post}) => {
  return (
    <article>
      <header>
        <figure>
          <Image src={post.cover} 
          width={438} height={133} 
          alt={`Capa do post de titulo ${post.title}`} 
          />
        </figure>
      </header>
      <section>
        <h3>{post.title}</h3>
        <p>{post.body}</p>

      </section>
      <footer>
        <Avatar 
          src={post.author.avatar}
          name={post.author.username}
        />
      </footer>
    </article>
  )
}

export default CardPost