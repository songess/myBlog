import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Mail, ExternalLink } from 'lucide-react';

export default function About() {
  const skills = ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'C', 'C++'];

  const projects = [
    {
      title: 'TIG',
      description: '여가 중개 플랫폼',
      technologies: ['Next.js', 'TypeScript', 'TailwindCSS'],
      link: 'https://tigleisure.com',
      image: '/png/tigthumbnail.png',
    },
    {
      title: 'My Beautiful Trip',
      description: '나의 여행기록 저장소',
      technologies: ['MongoDB', 'Express.js', 'Next.js'],
      link: 'https://github.com/songess/MBT',
      image: '/png/airplane.png',
    },
    {
      title: '서강첫차',
      description: '새로운, 하지만 비슷한 서강친구 만들기',
      technologies: ['React', 'TypeScript'],
      link: 'https://github.com/FirstCarSogang/frontend',
      image: '/png/guide1.png',
    },
  ];

  return (
    <div className="container mx-auto pb-8 relative px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8 space-y-4 md:space-y-0 md:space-x-8 animate-slideUpFade opacity-0">
          <div className="w-[200px] h-[200px] relative shrink-0">
            <Image
              src="/png/profile.jpeg"
              alt="프로필 사진"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">송은수</h1>
            <p className="text-xl text-muted-foreground mb-4">Developer</p>
            <p className="text-lg mb-4">
              더 나은 사용자 경험을 제공하기 위해 노력합니다.
              <br />
            </p>
          </div>
        </div>

        <Card className="mb-8 animate-slideUpFade delay-150 opacity-0">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 p-0">기술 스택</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 animate-slideUpFade delay-300 opacity-0">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 p-0">교육</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold p-0">Sogang University</h3>
                <p className="text-muted-foreground">
                  Computer Science (2020 – Present)
                </p>
              </div>
              <hr />
              <h2 className="text-2xl font-semibold mb-4 p-0">경력</h2>
              <div>
                <h3 className="text-lg font-bold p-0">CEOS Frontend Part</h3>
                <p className="text-muted-foreground">
                  March 2024 – August 2024
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold">Frontend Developer, TIG</h3>
                <p className="text-muted-foreground">July 2024 – Present</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8 animate-slideUpFade delay-500 opacity-0">
          <h2 className="text-2xl font-semibold mb-6">프로젝트</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-card rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      프로젝트 보기 <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card className="animate-slideUpFade delay-700 opacity-0">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">연락처</h2>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon">
                <a href="mailto:songess@naver.com" aria-label="이메일 보내기">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon">
                <a
                  href="https://github.com/songess"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub 프로필"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              {/* <Button variant="outline" size="icon">
                <a
                  href="https://naver.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn 프로필"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
