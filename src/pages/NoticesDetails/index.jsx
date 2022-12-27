import * as C from './styles'
import { useState, useEffect } from 'react'
import { apiProject } from '../../services/api'
import { Link, useParams } from 'react-router-dom'
import { DiscussionEmbed } from 'disqus-react'
import { ArrowLeft } from 'phosphor-react'

export function NoticesDetails() {
  const [item, setItem] = useState([])
  const { postId } = useParams()

  useEffect(() => {
    try {
      apiProject.get(`/news/${postId}`).then((response) => {
        const item = response.data
        setItem(item)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <C.Container>
      <C.Content>
        <img src={item.image} alt="" />
        <C.Comp>
          <Link to="/notices">
            <ArrowLeft size={32} weight="bold" style={{ display: 'inline-block' }} color="#245633" />
            Voltar
          </Link>
          <C.TextContent>
            <h1 id="title">{item.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
          </C.TextContent>
          <DiscussionEmbed
            shortname="test-ouqrdc3gfh"
            config={{
              url: 'http://192.168.0.113:5173/notices',
              identifier: item.postId,
              title: item.title,
              language: 'pt_BR',
            }}
            key={item.postId}
          />
        </C.Comp>
      </C.Content>
    </C.Container>
  )
}
